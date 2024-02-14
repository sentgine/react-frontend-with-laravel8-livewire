import React from "react";
import TopNavigation from "../components/TopNavigation";
import SidebarNavigation from "../components/SidebarNavigation";

export default function dashboard() {
    return (
        <div className="h-screen">
            <TopNavigation />
            <div className="flex">
                <SidebarNavigation />
                <main className="flex-1 bg-gray-200 p-6">
                    <h1 className="w-full text-3xl text-gray-800 font-bold leading-tight">
                        Dashboard
                    </h1>
                </main>
            </div>
        </div>
    );
}
