# Solvro Recruitment Task: Cocktails-App 

## 🚀 Quick Start

### Nestify link
   https://sovro-coctails-app.netlify.app

### Prerequisites
- **Node.js** (v21 or higher)
- **npm** package manager

### Installation & Setup
1. **Navigate to the app directory**
   ```bash
   cd cocktails-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - The app will be available at `http://localhost:5173`

## 🐛 Troubleshooting

### Windows PowerShell Execution Policy Error
If you encounter this error on Windows:
```
File C:\Program Files\nodejs\npm.ps1 cannot be loaded. The file C:\Program Files\nodejs\npm.ps1 is not digitally signed. You cannot run this script on the current system.
```

**Solution:**
1. Open PowerShell as Administrator
2. Run the following command:
   ```powershell
   Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```
3. Confirm with `Y` when prompted
4. Try running `npm run dev` again
