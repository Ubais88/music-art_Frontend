import React from 'react'
import styles from './Profile.module.css'

const Profile = () => {
  return (
    <div className={styles.profileHeader}>
        <p>Mohd Ubais</p>
        <div className={styles.divider}></div>
        <p>Logout</p>
    </div>
  )
}

export default Profile