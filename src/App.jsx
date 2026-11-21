import './App.css';
import { SignupForm } from './features/signup/SignupForm';

export const App = () => {
  return (
    <main className='container'>
      <h1>Web Dev Signup</h1>
      <SignupForm />
    </main>
  );
};
