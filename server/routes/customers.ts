import { Request, Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';

const CUSTOMERS_FILE = path.join(__dirname, '../data/customers.json');

// قراءة العملاء من الملف
const readCustomers = () => {
  try {
    if (!fs.existsSync(CUSTOMERS_FILE)) {
      return [];
    }
    const data = fs.readFileSync(CUSTOMERS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading customers file:', error);
    return [];
  }
};

// كتابة العملاء إلى الملف
const writeCustomers = (customers: any[]) => {
  try {
    // التأكد من وجود المجلد
    const dir = path.dirname(CUSTOMERS_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(CUSTOMERS_FILE, JSON.stringify(customers, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing customers file:', error);
    return false;
  }
};

// توليد رقم تتبع جديد
const generateTrackingId = () => {
  return "TRK" + Date.now().toString().slice(-6);
};

// GET /api/customers - جلب جميع العملاء
export const getCustomers = (req: Request, res: Response) => {
  try {
    const customers = readCustomers();
    res.json(customers);
  } catch (error) {
    console.error('Error getting customers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// GET /api/customers/search?q=query - البحث عن عميل
export const searchCustomer = (req: Request, res: Response) => {
  try {
    const query = req.query.q as string;
    
    if (!query) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }
    
    const customers = readCustomers();
    const searchQuery = query.trim().toLowerCase();
    
    const result = customers.find((customer: any) => 
      customer.email.toLowerCase() === searchQuery ||
      customer.id.toLowerCase() === searchQuery ||
      customer.phone === query.trim()
    );
    
    if (result) {
      res.json(result);
    } else {
      res.status(404).json({ error: 'Customer not found' });
    }
  } catch (error) {
    console.error('Error searching customer:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// POST /api/customers - إضافة عميل جديد
export const addCustomer = (req: Request, res: Response) => {
  try {
    const customerData = req.body;
    
    // التحقق من ��لبيانات المطلوبة
    if (!customerData.email || !customerData.studentName || !customerData.scholarshipName) {
      return res.status(400).json({ error: 'Missing required fields: email, studentName, scholarshipName' });
    }
    
    const customers = readCustomers();
    
    // التحقق من عدم تكرار البريد
    const existingCustomer = customers.find((customer: any) => 
      customer.email.toLowerCase() === customerData.email.toLowerCase()
    );
    
    if (existingCustomer) {
      return res.status(409).json({ error: 'Customer with this email already exists' });
    }
    
    // إنشاء العميل الجديد
    const trackingId = generateTrackingId();
    const currentDate = new Date().toISOString().split('T')[0];
    
    const newCustomer = {
      id: trackingId,
      email: customerData.email,
      phone: customerData.phone || '',
      studentName: customerData.studentName,
      scholarshipName: customerData.scholarshipName,
      university: customerData.university || 'غير محدد',
      submissionDate: null,
      status: customerData.status || 'لم يتم التقديم',
      statusCode: customerData.statusCode || 'not_submitted',
      progress: customerData.progress || 20,
      currentStep: customerData.currentStep || 'بدء العمل',
      documents: {
        cv: 'غير مبدوء',
        motivationLetter: 'غير مبدوء',
        transcripts: 'غير مبدوء',
        passport: 'غير مبدوء',
        languageCert: 'غير مبدوء'
      },
      timeline: [
        {
          date: currentDate,
          status: 'بدء العمل',
          description: 'تم إنشاء الطلب من لوحة التحكم'
        }
      ],
      nextSteps: [
        'البدء في إعداد المستندات',
        'التواصل مع العميل لجمع البيانات'
      ],
      notes: customerData.notes || '',
      expectedResponseDate: customerData.expectedResponseDate || '2025-06-01'
    };
    
    customers.push(newCustomer);
    
    if (writeCustomers(customers)) {
      res.status(201).json(newCustomer);
    } else {
      res.status(500).json({ error: 'Failed to save customer' });
    }
  } catch (error) {
    console.error('Error adding customer:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// PUT /api/customers/:id - تحديث عميل
export const updateCustomer = (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    const customers = readCustomers();
    const customerIndex = customers.findIndex((customer: any) => customer.id === id);
    
    if (customerIndex === -1) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    
    // تحديث البيانات
    customers[customerIndex] = { ...customers[customerIndex], ...updateData };
    
    if (writeCustomers(customers)) {
      res.json(customers[customerIndex]);
    } else {
      res.status(500).json({ error: 'Failed to update customer' });
    }
  } catch (error) {
    console.error('Error updating customer:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// DELETE /api/customers/:id - حذف عميل
export const deleteCustomer = (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const customers = readCustomers();
    const customerIndex = customers.findIndex((customer: any) => customer.id === id);
    
    if (customerIndex === -1) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    
    customers.splice(customerIndex, 1);
    
    if (writeCustomers(customers)) {
      res.json({ message: 'Customer deleted successfully' });
    } else {
      res.status(500).json({ error: 'Failed to delete customer' });
    }
  } catch (error) {
    console.error('Error deleting customer:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// GET /api/customers/stats - إحصائيات العملاء
export const getCustomerStats = (req: Request, res: Response) => {
  try {
    const customers = readCustomers();
    
    const stats = {
      total: customers.length,
      ready: customers.filter((c: any) => c.statusCode === 'ready').length,
      inProgress: customers.filter((c: any) => c.statusCode === 'in_progress').length,
      submitted: customers.filter((c: any) => c.statusCode === 'submitted').length,
      notSubmitted: customers.filter((c: any) => c.statusCode === 'not_submitted').length
    };
    
    res.json(stats);
  } catch (error) {
    console.error('Error getting customer stats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
