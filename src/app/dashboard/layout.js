import Link from "next/link";
import { AiOutlineMenuFold } from "react-icons/ai";


export const metadata = {
    title: 'Dashboard',
    description: 'First NextJS APP',
}

const DashboardLayout = ({ children }) => {
    return (
        <div className='flex'>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center">
                    {/* Page content here */}
                    <div className="flex lg:hidden justify-between bg-white p-2 w-full">
                        <span>Easy-Shop</span>

                        <span>
                            <label htmlFor="my-drawer-2" className="btn btn-primary btn-sm drawer-button lg:hidden"><AiOutlineMenuFold></AiOutlineMenuFold></label>
                        </span>
                    </div>
                    {children}

                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu text-xl p-4 max-w-60 md:w-80 lg:w-90 h-full bg-base-200 text-base-content">

                        <h2 className='btn btn-outline border-none text-xl text-violet-500 font-bold mb-10'>Easy-Shop</h2>

                        <hr />
                        <Link href="/dashboard" className='btn btn-outline border-none btn-sm my-4'>
                            Dashboard Home
                        </Link>

                        <Link href="/dashboard/addProduct" className='btn btn-outline border-none btn-sm my-4'>
                            Add Product
                        </Link>
                        <Link href="/dashboard/manageProduct" className='btn btn-outline btn-sm border-none my-4'>
                            Manage Product
                        </Link>
                        <hr />
                        <Link href="/" className='btn btn-outline border-none btn-sm mt-10'>
                            Back To Home
                        </Link>

                    </ul>

                </div>
            </div>

        </div>
    );
};

export default DashboardLayout;