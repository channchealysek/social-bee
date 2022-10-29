import React, { useState, useContext } from "react";
import DashboardCard from '../DashboardCard'
import AddFriends from "./AddFriends";
import {useParams} from 'react-router-dom';
import UserPosts from "./UserPosts";
import UserStores from "./UserStores";
import { AuthContext } from "../../utils/auth";

import { useQuery } from "@apollo/client";
import { GET_USER_BY_ID } from "../../utils/queries";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const { userId } = useParams();
  const { data } = useQuery(GET_USER_BY_ID,{
    variables: {
      userId
    }
  });
  const getUserById = data?.getUserById;

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
    <DashboardCard actionViews={actionViews} friendCounts={data?getUserById.friendCount : "0"} postCounts={"20"}/>
    {_Target}
    </>
  );
}
