"use client";

import { database, db } from "@/app/FirebaseConfig";
import { get, ref } from "firebase/database";
import { useEffect, useState } from "react";

import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { getSession } from "next-auth/react";

const FirebaseGet = () => {
  const [tries, setTries] = useState();
  const usersCollectionRef = collection(db, "users");

  useEffect(() => {
    let doctor;

    const getDoctor = async () => {
      const { user } = await getSession();
      // console.log(user);
      doctor = user;

      const data = await getDocs(usersCollectionRef);

      const formattedData = data.docs.map((doc) => {
        const email = doc.data().email;
        return {
          email: email,
          id: doc.id,
        };
      });

      const filteredData = formattedData.filter((dbUser) => {
        return user.email === dbUser.email;
      });

      console.log(filteredData);

      const userId = filteredData[0].id;
      // const usersCollectionRefID = collection(db, `users/${userId}`);

      const docRef = doc(db, `users`, userId);
      const userCollectionRef = docRef.collection("patients");
      await setDoc(docRef, { test: "dadkj" });
    };

    getDoctor();

    // code for patient retrival

    const userRef = ref(database, "users/28Vwffza7FRCQnulxvoursRyhYL2/maze");

    get(userRef).then((snapshot) => {
      if (snapshot.exists()) {
        const snapshotArr = Object.values(snapshot.val());
        snapshotArr.sort((a, b) => a.overallTime - b.overallTime);

        let prevTime = 0;

        const processedData = snapshotArr.map((tryItem, index) => {
          const newItem = {
            count: `trial ${index + 1}`,
            Time: tryItem.overallTime,
          };
          // prevTime = tryItem.overallTime;

          return newItem;
        });

        setTries(processedData);
        console.log(processedData);
      }
    });
  }, []);

  return <div></div>;
};

export default FirebaseGet;
