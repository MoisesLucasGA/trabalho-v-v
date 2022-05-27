import React, { useEffect, useState } from 'react'
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase-config'
import { Button, Input, Space, Table } from 'antd'
import Column from 'antd/lib/table/Column'
import { EditOutlined, DeleteOutlined, SearchOutlined, ClockCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useStyles } from "./admin.styles.js"
import { EditPatientModal } from "../../components/EditPatientModal/EditPatientModal"
import { NewPatientModal } from "../../components/NewPatientModal/NewPatientModal"
import { LoginModal } from "../../components/LoginModal/LoginModal"
import Patient from '../patient/patient'


const Admin = () => {
  const styles = useStyles

  return (
    <div style={styles.menu}>
      <LoginModal></LoginModal>
    </div>
  )
}

export default Admin
