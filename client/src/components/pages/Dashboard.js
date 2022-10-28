import React, { useState, useContext } from "react";
import DashboardCard from '../DashboardCard'
import AddFriends from "./AddFriends";
import UserPosts from "./UserPosts";
import UserStores from "./UserStores";
import { AuthContext } from "../../utils/auth";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  if(!user) window.location.assign("/");
  const [_Target, _setTarget] = useState(<UserPosts postCounts />);

  function actionViews(event) {
    const _target = event.target.name;
    if (_target === "bntuser") {
     _setTarget(
        <AddFriends />)
    }
    if (_target === "bntviewposts") {
      _setTarget(<UserPosts />)
    }
    if (_target === "bntstore") {
      _setTarget(<UserStores />)
    }
  }
  return (
    <>
    <DashboardCard actionViews={actionViews}/>
    {_Target}
    </>
  );
}
