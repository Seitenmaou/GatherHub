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

    const tempList = [
        "one","two","three","four","five"
    ]
       
        function placeOptions(current, index, array){
            return(<option value={`${current}`}/>)
        }

        function placeSkillSettings(current, index){
            return(
            <div className="col-sm-1 form-group">
                        <label htmlFor={`skill-${skillCategories[index]}`} className='form-label'>{skillCategories[index]}</label>
                        <input className="form-control" list={`list-${skillCategories[index]}`} id="exampleDataList" placeholder="Type to search..."/>
                        <datalist id={`list-${skillCategories[index]}`}>
                            {tempList.map(placeOptions, skillCategories[index])}
                        </datalist>
                        <button className='btn btn-primary'>Add</button>
                    </div>
            )
        }
        
    

    async function handleSubmit(e) {
        e.preventDefault()

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
                <div className="row">
                    {skillCategories.map(placeSkillSettings)}
                </div>
                <div className='col-sm-2'>
                    <div className='row'></div>
                </div>
                

            </form>
    </main>
    )
}

export default UserProfile