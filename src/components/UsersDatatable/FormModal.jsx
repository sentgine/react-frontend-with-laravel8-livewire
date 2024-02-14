import React, { useEffect, useState } from "react";
import axios from "axios";
import axiosConfig from "../../config/axios-config";

export default function FormModal({
    setShowFormModal,
    formMode,
    userId,
    defaultUserData,
    fetchUsers,
    meta,
}) {
    const [email, setEmail] = useState(defaultUserData?.email);
    const [password, setPassword] = useState(defaultUserData?.password);
    const [first_name, setFirstName] = useState(defaultUserData?.first_name);
    const [last_name, setLastName] = useState(defaultUserData?.last_name);

    /**
     * Create the user
     *
     * @param object userData
     */
    const handleCreateUser = (userData) => {
        axios
            .post(
                `${import.meta.env.VITE_API_URL}/api/v1/users`,
                userData,
                axiosConfig
            )
            .then((response) => {
                setShowFormModal(false);
            })
            .finally(() => {
                fetchUsers(
                    `${import.meta.env.VITE_API_URL}/api/v1/users?page=${
                        meta.current_page
                    }`
                );
            });
    };

    /**
     * Update the user
     *
     * @param object userData
     */
    const handleUpdateUser = (userData) => {
        axios
            .put(
                `${import.meta.env.VITE_API_URL}/api/v1/users/${userId}`,
                userData,
                axiosConfig
            )
            .then((response) => {
                setShowFormModal(false);
            })
            .finally(() => {
                fetchUsers(
                    `${import.meta.env.VITE_API_URL}/api/v1/users?page=${
                        meta.current_page
                    }`
                );
            });
    };

    /**
     * Handle the form submission
     *
     * @param object e
     */
    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if the form is on create or edit mode
        if (formMode === "create") {
            // Create the user
            handleCreateUser({
                email,
                password,
                first_name,
                last_name,
            });
        } else {
            // Update the user
            handleUpdateUser({
                email,
                password,
                first_name,
                last_name,
            });
        }
    };

    /**
     * Handle all the form input text field change
     *
     * @param object e
     */
    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case "email":
                setEmail(value);
                break;
            case "password":
                setPassword(value);
                break;
            case "first_name":
                setFirstName(value);
                break;
            case "last_name":
                setLastName(value);
                break;
            default:
                break;
        }
    };

    return (
        <div className="bg-gray-500 bg-opacity-20 h-full w-full fixed top-0 left-0 text-gray-600">
            <div className="flex justify-center items-center h-full">
                <div className="bg-white w-[800px] mx-auto rounded-lg shadow-lg p-6">
                    <div className="flex justify-between">
                        <h1 className="text-2xl font-bold mb-4">
                            {formMode === "create" ? "Create " : "Update "} User{" "}
                        </h1>
                        {/* close button */}
                        <button onClick={() => setShowFormModal(false)}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col mb-4">
                            <label
                                className="text-gray-700 font-medium mb-2"
                                htmlFor="email"
                            >
                                Email
                            </label>
                            <input
                                className="bg-white rounded-lg p-2 border-2 border-gray-300"
                                type="email"
                                id="email"
                                name="email"
                                value={email || ""}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col mb-4">
                            <label
                                className="text-gray-700 font-medium mb-2"
                                htmlFor="password"
                            >
                                Password
                            </label>
                            <input
                                className="bg-white rounded-lg p-2 border-2 border-gray-300"
                                type="password"
                                id="password"
                                name="password"
                                value={password || ""}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col mb-4">
                            <label
                                className="text-gray-700 font-medium mb-2"
                                htmlFor="first-name"
                            >
                                First Name
                            </label>
                            <input
                                className="bg-white rounded-lg p-2 border-2 border-gray-300"
                                type="text"
                                id="first-name"
                                name="first_name"
                                value={first_name || ""}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col mb-4">
                            <label
                                className="text-gray-700 font-medium mb-2"
                                htmlFor="last-name"
                            >
                                Last Name
                            </label>
                            <input
                                className="bg-white rounded-lg p-2 border-2 border-gray-300"
                                type="text"
                                id="last-name"
                                name="last_name"
                                value={last_name || ""}
                                onChange={handleChange}
                            />
                        </div>

                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg">
                            Save
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
