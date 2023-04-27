import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ChangePassword from './ChangePassword';
import PersonalData from './PersonalData';

export default function ProfileEdit() {

  
  return (
    <div className='bg-white p-5 mb-5 text-sm'>

    <h3>Profile Details</h3>

    <Tabs>
        <TabList>
          <Tab>PERSONAL DATA</Tab>
          <Tab>PASSWORD</Tab>
        </TabList>

        <TabPanel>
          <PersonalData />
        </TabPanel>
        <TabPanel>
          <ChangePassword />
        </TabPanel>
    </Tabs>

  </div>

  )
}
