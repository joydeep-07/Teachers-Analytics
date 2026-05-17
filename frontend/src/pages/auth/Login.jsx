import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Card, CardHeader, CardContent } from '../../components/common/Card';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Teacher'); // Default to Teacher
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

 const handleSubmit = async (e) => {
   e.preventDefault();
   setError("");
   setIsLoading(true);

   try {
     const data = await login(email, password, role);

     console.log("LOGIN RESPONSE:", data); // ADD THIS

     if (data.success) {
       if (data.user.role === "Admin") {
         navigate("/admin");
       } else {
         navigate("/teacher");
       }
     } else {
       setError(data.message || "Login failed");
     }
   } catch (err) {
     console.log(err); // ADD THIS
     setError(err.response?.data?.message || "An error occurred during login.");
   } finally {
     setIsLoading(false);
   }
 };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-md w-full shadow-lg border-0">
        <CardHeader 
          title="Sign in to your account" 
          description={`Login as ${role} to access the portal.`} 
          className="text-center"
        />
        <CardContent>
          <div className="flex bg-slate-100 p-1 rounded-lg mb-6">
            <button
              onClick={() => setRole('Teacher')}
              className={`flex-1 text-sm font-medium py-2 rounded-md transition-colors ${role === 'Teacher' ? 'bg-white shadow-sm text-cyan-600' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Teacher
            </button>
            <button
              onClick={() => setRole('Admin')}
              className={`flex-1 text-sm font-medium py-2 rounded-md transition-colors ${role === 'Admin' ? 'bg-white shadow-sm text-cyan-600' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Admin
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm border border-red-100">
                {error}
              </div>
            )}
            <Input
              label="Email address"
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
            <Input
              label="Password"
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
            <Button type="submit" variant="primary" className="w-full mt-2" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
