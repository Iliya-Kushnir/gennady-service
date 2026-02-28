import ApplicationForm from "@/components/ApplicationForm/AppplicationForm";


const LoginPage = () => {
  return (
    <div className="bg-slate-950 py-24 min-h-screen flex flex-col items-center">
        <div className="lg:w-1/2 p-8 md:p-16">
            <ApplicationForm/>
        </div>
    </div>
  );
}

export default LoginPage;