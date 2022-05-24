import React,{useState,useEffect} from 'react'
import {useNavigate,Link} from 'react-router-dom'
import {fetchCompanies,deleteCompany} from '../../Global/features/Employers/companies/companies'
import KebabMenu from '../../Global/KebabMenu/KebabMenu'
import {useAppSelector,useAppDispatch} from '../../Global/features/hooks'
import {handleAddSuccessMsg} from '../../Global/messages/SuccessAlert'
import Popup from '../../Global/Popup/Popup'
import axios from 'axios'

export default function CompaniesPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [dropdown,setDropdown] = useState<number | null>(null)
  const [chosenCompany,setChosenCompany] = useState({id: 0, name: ''})
  const [popup,setPopup] = useState(false)
  const companies = useAppSelector(state => state.companies)

  useEffect(() => {
    dispatch(fetchCompanies())
    .unwrap()
    .then(response => {
      if (!response.length) navigate('/create-company')
    })
  },[dispatch,navigate])

  function ShowPopup(id: number, name: string){
    setChosenCompany({id: id, name: name})
    setPopup(true)
  }

  function handleDeleteCompany(){
    axios.delete(`/api/company?id=${chosenCompany.id}`)
    .then(response => {
    if (response.status === 200){
        dispatch(deleteCompany(chosenCompany.id))
        handleAddSuccessMsg('Company is successfully removed', dispatch)
        navigate('/companies')
        setPopup(false)
    } 

  })
}
  
  return (
    <div>
      <Popup trigger = {popup} switchOff = {() => setPopup(false)}>
          <p>Are you sure you want to remove {chosenCompany.name}?</p>
          <p style = {{fontSize: 'small'}}>(This action cannot be undone)</p>
          <button onClick = {handleDeleteCompany}>Confirm</button>
      </Popup>

        <h1 className = 'title'>Companies</h1>
        {companies.values?.map((company, index) => {
          return (
            <div className = 'Container' key = {index}>
              <KebabMenu current = {dropdown} many = {true} index = {index} switchOn = {() => setDropdown(index)} switchOff = {() => setDropdown(null)}>
                <Link to = {`/edit-company/${company.id}`}><button className = 'dropdownBtn'>Edit</button></Link>
                <button className = 'dropdownBtn'>View all jobs</button>
                <button className = 'dropdownBtn redNavBtn' onClick = {() => ShowPopup(company.id,company.name)}>Delete</button>
              </KebabMenu>

              <section style = {{display: 'flex'}}>
                 <Link to = {`/company/${company.id}`}><h2>{company.name}</h2></Link>
                 {company.logo ? <img className = 'logo' src = {company.logo} alt = ''/> : null} 
              </section>

              <hr className = 'mt-0-mb-4'/>
              <p><i className = 'fa fa-phone icon'></i>000011111</p>
              <p><i className = 'icon'>&#9993;</i>{company.user.email}</p>
              {company.website ? <a href = {company.website} target = '_blank' rel = 'noreferrer'><p>Website: {company.website}</p></a> : null}

              <section style = {{display: 'flex'}}>
                <Link to = {`/company/${company.id}`}><button>View</button></Link>
                <Link to = {`/post-job/${company.id}`}><button>Post job</button></Link> 
              </section>
            </div>
          )
        })}
    </div>
  )
}
