import React from 'react';
import Task_1 from './task_1';
import Task_2 from './task_2';
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import { useState } from 'react';
import 'react-tabs/style/react-tabs.css';


function App({ row = 4, col = 4, NO_OF_RED_BOX = 2 }) {

  const [tabIndex, setTabIndex] = useState(0);

  return (
    <div>
      <h1>Frontend Assignment</h1>

      <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        <TabList>
          <Tab>Task 1</Tab>
          <Tab>Task 2</Tab>
        </TabList>
        <TabPanel><Task_1></Task_1></TabPanel>
        <TabPanel><Task_2></Task_2></TabPanel>
      </Tabs>
    </div>
  );
}

export default App;
