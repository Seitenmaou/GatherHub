import React, { useState, useContext } from 'react';
import { useNavigate, useParams } from "react-router"
import { CurrentUser } from '../contexts/CurrentUser';





function UserProfile() {
    
    const { currentUser } = useContext(CurrentUser)
    
	const navigate = useNavigate()

    const [user, setUser] = useState(currentUser)

    const skillCategories = [
        "Art",
        "Science",
        "Athletics",
        "Communication",
        "Organization",
        "Creativity"
    ]

    const [tempSkillList, setTempSkillList]= useState([
        user.skillList0,
        user.skillList1,
        user.skillList2,
        user.skillList3,
        user.skillList4,
        user.skillList5
    ])

        function updateTempSkill(e, index){
            const oldTemp = [...tempSkillList]
            oldTemp[index] = e.target.value
            setTempSkillList(oldTemp)
        }

        function placeSkillSettings(current, index){
            return(
            <div className="col-sm-6 form-group" key={`skill-${skillCategories[index]}`}>
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
        

        function prepUpdate(){//I hate this too, dont worry, ill find a recursive way eventually, IF POSTGRES ACCEPTED UNEVEN MULTIDIMETIONAL ARRAYS!!!!

            if (!Array.isArray(tempSkillList[0])){user.skillList0 = tempSkillList[0].split(",")}
            if (!Array.isArray(tempSkillList[1])){user.skillList1 = tempSkillList[1].split(",")}
            if (!Array.isArray(tempSkillList[2])){user.skillList2 = tempSkillList[2].split(",")}
            if (!Array.isArray(tempSkillList[3])){user.skillList3 = tempSkillList[3].split(",")}
            if (!Array.isArray(tempSkillList[4])){user.skillList4 = tempSkillList[4].split(",")}
            if (!Array.isArray(tempSkillList[5])){user.skillList5 = tempSkillList[5].split(",")}

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

    async function handleSubmit(e) {
        e.preventDefault()

        prepUpdate()

        await fetch(`${process.env.REACT_APP_SERVER_URL}users/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        navigate(`/`)
    }

    return (
        <main>
            <form onSubmit={handleSubmit}>

                <h1>General Info</h1>
                <div className="row">
                    <div className="col-sm-2 form-group">
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
                    <div className="col-sm-2 form-group">
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
                    <div className="col-sm-2 form-group">
                        <label htmlFor="userName">User Name (Optional, will display instead of name)</label>
                        <input
                            value={user.userName || ""}
                            onChange={e => setUser({ ...user, userName: e.target.value })}
                            className="form-control"
                            id="userName"
                            name="userName"
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-2 form-group">
                        <label htmlFor="email">email</label>
                        <input
                            required
                            value={user.email}
                            onChange={e => setUser({ ...user, email: e.target.value })}
                            className="form-control"
                            id="email"
                            name="email"
                        />
                    </div>
                    <div className="col-sm-2 form-group">
                        <label htmlFor="title">Title (Optional)</label>
                        <input
                            value={user.title || "" }
                            onChange={e => setUser({ ...user, title: e.target.value })}
                            className="form-control"
                            id="title"
                            name="title"
                        />
                    </div>
                    <div className="col-sm-2 form-group">
                        <label htmlFor="profession">Profession (Optional)</label>
                        <input
                            value={user.profession || ""}
                            onChange={e => setUser({ ...user, profession: e.target.value })}
                            className="form-control"
                            id="profession"
                            name="profession"
                        />
                    </div>
                </div>

                <input className="btn btn-primary" type="submit" value="Update" />

                <h1>Skills Info</h1>
                <p>Separate each skill with a comma</p>
                {skillCategories.map(placeSkillSettings)}

                

            </form>
    </main>
    )
}

export default UserProfile