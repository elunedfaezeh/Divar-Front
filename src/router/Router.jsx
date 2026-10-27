import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AdminPage from "Pages/AdminPage";
import AuthPage from "Pages/AuthPage";
import DashboardPage from "Pages/DashboardPage";
import HomePage from "Pages/HomePage";
import NotFound from "Pages/NotFound";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "src/Services/user";
import Loader from "src/Components/modouls/Loader";
import PostDetails from "src/Pages/PostDetails";

const Router = () => {
  const { data, isLoading, isError, error } = useQuery(["profile"], getProfile);
  console.log({ data, isLoading, error });

  if(isLoading) return <Loader/>

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth" element={data ? <Navigate to={"/dashboard"}/> : <AuthPage/>} />
      <Route path="/dashboard" element={data ? <DashboardPage/> : <Navigate to={"/auth"}/>} />
      <Route path="/admin" element={data && data?.role === "ADMIN" ? <AdminPage/>: <Navigate to={"/"}/> }  />
              <Route path="/post/:id" element={<PostDetails />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
