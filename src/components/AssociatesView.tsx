import React, { useEffect } from "react";
import { Associate } from '../models';
import { DataStore } from 'aws-amplify';


async function onQuery() {
  const associates = await DataStore.query(Associate);
  console.log(associates);
}

function AssociatesView() {
  useEffect(() => {
    const subscription = DataStore.observe(Associate).subscribe((msg) => {
      console.log(msg.model, msg.opType, msg.element);
    });

    return () => subscription.unsubscribe();
  }, []);
  
  return (
    <div>
       <input type="button" value="Log members" onClick={onQuery} />
    </div>
  );
}

export default AssociatesView;
