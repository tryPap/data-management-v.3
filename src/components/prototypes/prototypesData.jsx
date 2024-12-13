const prototypes = [
  {
    id: 1,
    description: "Student",
    keys: ["Name", "Surname", "Grade", "Class"],
  },
  {
    id: 2,
    description: "Task",
    keys: ["Task Name", "Priority", "Due Date"],
  },
  {
    id: 3,
    description: "Car",
    keys: ["Brand", "Model", "Cost", "Category", "Stock"],
  },
  {
    id: 4,
    description: "Employee",
    keys: ["Employee ID", "Name", "Position", "Salary", "Department"],
  },
  {
    id: 5,
    description: "Customer",
    keys: ["Customer ID", "Name", "Email", "Phone", "Address"],
  },
  {
    id: 6,
    description: "Project",
    keys: ["Project ID", "Project Name", "Client", "Deadline", "Budget"],
  },
  {
    id: 7,
    description: "Invoice",
    keys: [
      "Invoice ID",
      "Customer ID",
      "Product List",
      "Total Amount",
      "Issue Date",
    ],
  },
  {
    id: 8,
    description: "Order",
    keys: [
      "Order ID",
      "Customer ID",
      "Product List",
      "Quantity",
      "Shipping Address",
    ],
  },
  {
    id: 9,
    description: "Supplier",
    keys: ["Supplier ID", "Name", "Contact Info", "Product List", "Location"],
  },
  {
    id: 10,
    description: "Employee Attendance",
    keys: ["Employee ID", "Date", "Status", "Time In", "Time Out"],
  },
  {
    id: 11,
    description: "Event",
    keys: ["Event ID", "Event Name", "Location", "Date", "Organizer"],
  },
  {
    id: 12,
    description: "Course",
    keys: ["Course ID", "Course Name", "Instructor", "Credits", "Duration"],
  },
  {
    id: 13,
    description: "Vehicle",
    keys: ["Vehicle ID", "Make", "Model", "Year", "Mileage", "Owner"],
  },
  {
    id: 14,
    description: "Warehouse",
    keys: ["Warehouse ID", "Location", "Manager", "Capacity", "Inventory"],
  },
  {
    id: 15,
    description: "Employee Performance",
    keys: [
      "Employee ID",
      "Review Date",
      "Performance Score",
      "Feedback",
      "Goals",
    ],
  },
  {
    id: 16,
    description: "Sales Transaction",
    keys: ["Transaction ID", "Customer ID", "Product ID", "Amount", "Date"],
  },
  {
    id: 17,
    description: "Meeting",
    keys: ["Meeting ID", "Topic", "Date", "Time", "Attendees"],
  },
  {
    id: 18,
    description: "Supplier Invoice",
    keys: [
      "Invoice ID",
      "Supplier ID",
      "Product List",
      "Total Amount",
      "Payment Status",
    ],
  },
  {
    id: 19,
    description: "Purchase Order",
    keys: [
      "Order ID",
      "Supplier ID",
      "Product List",
      "Total Cost",
      "Order Date",
    ],
  },
  {
    id: 20,
    description: "Shipment",
    keys: [
      "Shipment ID",
      "Order ID",
      "Shipment Date",
      "Carrier",
      "Tracking Number",
    ],
  },
];

export default prototypes;
