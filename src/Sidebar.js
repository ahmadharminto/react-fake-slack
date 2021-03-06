import React, { useState, useEffect } from 'react'
import './Sidebar.scss'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import CreateIcon from '@material-ui/icons/Create'
import SidebarOption from './SidebarOption'
import InsertCommentIcon from '@material-ui/icons/InsertComment'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import AddIcon from '@material-ui/icons/Add'
import db from './firebase'
import { useStateValue } from './StateProvider'
import { Link } from 'react-router-dom'

function Sidebar() {
    const [{ user }] = useStateValue();
    const [channels, setChannels] = useState([]);

    useEffect(() => {
        db.collection('rooms').onSnapshot(snapshot => (
            setChannels(snapshot.docs.map(doc => (
                {
                    id: doc.id,
                    name: doc.data().name
                }
            )))
        ))
    }, [])

    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <div className="sidebar__info">
                    <Link to="/">
                        <h2>Toymakr3D Slack</h2>
                    </Link>
                    <h3>
                        <FiberManualRecordIcon /> {user?.displayName}
                    </h3>
                </div>
                <CreateIcon />
            </div>
            <SidebarOption Icon={InsertCommentIcon} title="Threads" />
            <SidebarOption Icon={ExpandLessIcon} title="Show Less" />
            <hr/>
            <SidebarOption Icon={ExpandMoreIcon} title="Channels" />
            <hr/>
            <SidebarOption Icon={AddIcon} title="Add Channel" addChannelOption />
            {channels.map(channel => (
                <SidebarOption id={channel.id} title={channel.name} key={channel.id} />
            ))}
        </div>
    )
}

export default Sidebar
