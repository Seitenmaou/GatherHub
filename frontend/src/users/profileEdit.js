//edit own profile details

import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from "react-router"
import { CurrentUserContext } from '../contexts/CurrentUser';

function UserProfile() {
    const  {currentUser}  = useContext(CurrentUserContext)
    const [user, setUser] = useState(null)
    const [tempSkillList, setTempSkillList]= useState(null)

    //get user info
    useEffect(() => {
        const getUserDetail = async () => {
           const response = await fetch(`${process.env.REACT_APP_SERVER_URL}profile/${currentUser.id}`)
           const resData = await response.json()
           setUser(resData)
           setTempSkillList([
            resData.skillList0,
            resData.skillList1,
            resData.skillList2,
            resData.skillList3,
            resData.skillList4,
            resData.skillList5
        ])
        }
        if (currentUser){
            getUserDetail()
        }
     },[currentUser])
	const navigate = useNavigate()

    //skill list default (TODO: make is customisable?)
    const skillCategories = [
        "Art",
        "Science",
        "Athletics",
        "Communication",
        "Organization",
        "Creativity"
    ]

    //temporary skill list to overwrite later
    function updateTempSkill(e, index){
        const oldTemp = [...tempSkillList]
        oldTemp[index] = e.target.value
        setTempSkillList(oldTemp)
    }

    //overwrite skill with temp
    function placeSkillSettings(current, index){
        return(
        <div className="col-sm-11 form-group m-2" key={`skill-${skillCategories[index]}`}>
                    <label htmlFor={`skill-${skillCategories[index]}`} className='form-label'>{skillCategories[index]}</label>
                    <input
                    className="form-control" 
                    value={tempSkillList[index]}
                    onChange={e => updateTempSkill(e, index)}
                    id="firstName"
                    name="firstName"
                    />
                </div>
        )
    }
    
    //prepare and update everything before sending
    function prepUpdate(){//I hate this too, dont worry, ill find a recursive way eventually, IF POSTGRES ACCEPTED UNEVEN MULTIDIMETIONAL ARRAYS!!!!

        if (!Array.isArray(tempSkillList[0])){user.skillList0 = tempSkillList[0].split(",")}
        if (!Array.isArray(tempSkillList[1])){user.skillList1 = tempSkillList[1].split(",")}
        if (!Array.isArray(tempSkillList[2])){user.skillList2 = tempSkillList[2].split(",")}
        if (!Array.isArray(tempSkillList[3])){user.skillList3 = tempSkillList[3].split(",")}
        if (!Array.isArray(tempSkillList[4])){user.skillList4 = tempSkillList[4].split(",")}
        if (!Array.isArray(tempSkillList[5])){user.skillList5 = tempSkillList[5].split(",")}
        if (!Array.isArray(user.profession)){user.profession = user.profession.split(",")}

        user.skillLevel[0] = user.skillList0.length
        if (user.skillLevel[0] > user.maxSkillLevel) {user.maxSkillLevel = user.skillLevel[0]}
        user.skillLevel[1] = user.skillList1.length
        if (user.skillLevel[1] > user.maxSkillLevel) {user.maxSkillLevel = user.skillLevel[1]}
        user.skillLevel[2] = user.skillList2.length
        if (user.skillLevel[2] > user.maxSkillLevel) {user.maxSkillLevel = user.skillLevel[2]}
        user.skillLevel[3] = user.skillList3.length
        if (user.skillLevel[3] > user.maxSkillLevel) {user.maxSkillLevel = user.skillLevel[3]}
        user.skillLevel[4] = user.skillList4.length
        if (user.skillLevel[4] > user.maxSkillLevel) {user.maxSkillLevel = user.skillLevel[4]}
        user.skillLevel[5] = user.skillList5.length
        if (user.skillLevel[5] > user.maxSkillLevel) {user.maxSkillLevel = user.skillLevel[5]}

    }

    //update profile detail
    async function handleSubmit(e) {
        e.preventDefault()
        prepUpdate()

        await fetch(`${process.env.REACT_APP_SERVER_URL}profile/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        {navigate(`/profile/${user.id}`)}
    }

    //wait for data before render
    if(!currentUser|| !user){
        return<h1>Loading...</h1>}

    return (
        <main>
            <div className="d-flex flex-column m-5 justify-content-center border rounded border-dark">
                <form onSubmit={handleSubmit}>
                <div className='row m-2'>
                <div className='col-sm border rounded border-dark m-2'>
                <h1>General Info</h1>
                <div className="row mt-4">
                    <div className="col-sm-3 form-group">
                        <label htmlFor="firstName">First Name</label>
                        <input
                            required
                            value={user.firstName}
                            onChange={e => setUser({ ...user, firstName: e.target.value })}
                            className="form-control"
                            id="firstName"
                            name="firstName"
                        />
                    </div>
                    <div className="col-sm-3 form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            required
                            value={user.lastName}
                            onChange={e => setUser({ ...user, lastName: e.target.value })}
                            className="form-control"
                            id="lastName"
                            name="lastName"
                        />
                    </div>
                    <div className="col-sm-4 form-group">
                        <label htmlFor="email">Email (Not displayed)</label>
                        <input
                            disabled
                            value={user.email}
                            onChange={e => setUser({ ...user, email: e.target.value })}
                            className="form-control"
                            id="email"
                            name="email"
                        />
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-sm-6 form-group">
                        <label htmlFor="userName">User Name (Optional, displays instead of name)</label>
                        <input
                            value={user.userName || ""}
                            onChange={e => setUser({ ...user, userName: e.target.value })}
                            className="form-control"
                            id="userName"
                            name="userName"
                        />
                    </div>
                    <div className="col-sm-6 form-group">
                        <label htmlFor="title">Title (Optional, displayed as "Name, Title")</label>
                        <input
                            value={user.title || "" }
                            onChange={e => setUser({ ...user, title: e.target.value })}
                            className="form-control"
                            id="title"
                            name="title"
                        />
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-sm-12 form-group">
                        <label htmlFor="profession">Profession (Optional, first one will be displayed at top of page, separate each with comma)</label>
                        <textarea
                            value={user.profession || ""}
                            onChange={e => setUser({ ...user, profession: e.target.value })}
                            className="form-control"
                            id="profession"
                            name="profession"
                        />
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-sm-12 form-group">
                        <label htmlFor="biography">Biography (Optional)</label>
                        <textarea
                            value={user.biography || ""}
                            onChange={e => setUser({ ...user, biography: e.target.value })}
                            className="form-control"
                            id="biography"
                            name="biography"
                        />
                    </div>
                </div>
                </div>
                <div className='col-sm-6 border rounded border-dark m-2'>
                <h1>Skills Info</h1>
                <p>Separate each skill with a comma</p>
                {skillCategories.map(placeSkillSettings)}
                    
                </div>
                <input className="btn btn-primary" type="submit" value="Update/View Profile" />
                </div>
            </form>
        </div>

    </main>
    )
}

export default UserProfile