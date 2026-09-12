# Finance & Legal Platform

An integrated web platform combining financial management and corporate legal compliance.

## 📊 Features

### 📊 Finance Side
- **Income & Expense Tracking**: Automated dashboards showing revenue, costs, and net profit
- **Profit/Loss Analysis**: Charts and percentages to visualize financial health
- **Budgeting Tools**: Set spending limits and track against actuals
- **Forecasting**: Predict future profits or losses based on past data

### ⚖️ Corporate Law Side
- **Contract Management**: Store, track, and remind about contract deadlines or renewal dates
- **Compliance Monitoring**: Alerts when new regulations affect the company (tax, labor, trade)
- **Governance Records**: Keep board meeting minutes, shareholder agreements, and resolutions organized
- **Risk & Liability Tracking**: Flag potential legal risks tied to financial decisions

### 🚀 Combined Platform Features
- **Unified Dashboard**: View profit margins, expense breakdowns, and legal compliance in one place
- **Smart Alerts**: Automated notifications for profit margin drops, contract expirations, and compliance deadlines
- **Document Vault**: Centralized storage for contracts, bylaws, and financial reports
- **Cross-Reference**: Link financial decisions to compliance requirements and legal obligations

## 🏗️ Project Structure

```
FinanceLegalPlatform/
├── backend/
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API endpoints
│   ├── middleware/      # Authentication & validation
│   ├── server.js        # Express server setup
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── App.js       # Main app component
│   │   └── index.js     # Entry point
│   ├── public/
│   ├── tailwind.config.js
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB
- npm or yarn

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
npm run dev
```

The backend server will run on `http://localhost:5000`

### Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
npm start
```

The frontend will open at `http://localhost:3000`

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Finance
- `GET /api/finance/dashboard/:companyId` - Get financial dashboard
- `POST /api/finance/record` - Add financial record
- `GET /api/finance/records/:companyId` - Get all records

### Contracts
- `GET /api/contracts/:companyId` - Get all contracts
- `POST /api/contracts` - Create contract
- `PUT /api/contracts/:id` - Update contract
- `POST /api/contracts/check-deadlines/:companyId` - Check for expiring contracts

### Compliance
- `GET /api/compliance/:companyId` - Get compliance items
- `POST /api/compliance` - Create compliance record
- `PUT /api/compliance/:id` - Update compliance status

### Alerts
- `GET /api/alerts/:companyId` - Get all alerts
- `PUT /api/alerts/:id/read` - Mark alert as read
- `PUT /api/alerts/:id/resolve` - Mark alert as resolved

### Governance
- `GET /api/governance/:companyId` - Get governance records
- `POST /api/governance` - Add governance record
- `PUT /api/governance/:id` - Update governance record

## 🔧 Technologies Used

### Backend
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **node-cron** - Scheduled tasks

### Frontend
- **React** - UI framework
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Chart.js** - Data visualization
- **Lucide React** - Icons
- **Axios** - API client

## 🔐 Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- CORS protection
- Input validation with Joi
- Role-based access control (finance, legal, admin)

## ⏰ Automated Tasks

- **Contract Deadline Check**: Runs daily at 9 AM to check for expiring contracts
- **Financial Health Check**: Runs every 6 hours to analyze profit margins and create alerts

## 📢 Alert Types

1. **Financial Alerts**: Profit margin drops, expense ratio violations
2. **Contract Alerts**: Expiring contracts, renewal reminders
3. **Compliance Alerts**: Regulation deadlines, compliance violations
4. **Governance Alerts**: Meeting reminders, resolution deadlines

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support, email support@finlegal.com or open an issue on GitHub.

---

**Built with ❤️ for finance and legal teams**
