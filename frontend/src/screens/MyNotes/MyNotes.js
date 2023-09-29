import React, { useEffect, useState } from 'react'
import { Accordion, Badge, Button, Card,AccordionButton ,AccordionCollapse } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import MainScreen from '../../component/MainScreen'
import ReactMarkdown from "react-markdown";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { deleteNoteAction, listNotes } from '../../actions/notesActions';
import ErrorMessage from '../../component/ErrorMessage';
import Loading from '../../component/Loading';
import parse from "html-react-parser"
import { Redirect } from 'react-router-dom';
import { useMemo } from 'react';
import { MDBInputGroup, MDBInput, MDBIcon, MDBBtn } from 'mdb-react-ui-kit';
import ReactPlayer from 'react-player'// import "react-html5video/dist/style";

const MyNotes = ({history}) => {

  const [Change, setChange] = useState(0);
  
  const [searchQuery, setSearchQuery] = useState('');

    const [isHidden, setIsHidden] = useState(true);
  
    const handleToggle = () => {
      setIsHidden(!isHidden);
    };
  const dispatch=useDispatch();
 const navigate=useNavigate(); 
  const noteList = useSelector((state) => state.noteList);
  const userLogin = useSelector((state) => state.userLogin);

  const{userInfo}=userLogin
  const {loading,error,notes} = noteList;
  const noteCreate=useSelector((state)=>state.noteCreate);
  const {sucess:successCreate}=noteCreate;
  
  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { success: successUpdate } = noteUpdate;
  const noteDelete = useSelector((state) => state.noteDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = noteDelete;
  const filteredNotes = useMemo(() => {
    if (notes) {
      return notes.filter((note) => note.title.includes(searchQuery));
    }
    return [];
  }, [searchQuery, notes]);
  

const show=(url)=>{
  if(url.endsWith('.png')||url.endsWith('.jpg')||url.endsWith('.jpeg'))
  return<img className="d-block mx-auto img-fluid" src={url} width="200" height="100" />
  else if(url.endsWith('shared'))
  return  <ReactPlayer url={url} width="100" height="100" />
  else
  return <h2>NOT FOUND!...</h2>
}
  
  
useEffect(()=>
{
  if(!userInfo)
  navigate("/login");
  dispatch(listNotes());
  // dispatch(listNotes({ sort }));
},[dispatch,navigate,userInfo,successCreate,successUpdate,successDelete]);
const deleteHandler = (id) => {
  if (window.confirm("Are you sure?")) {
    dispatch(deleteNoteAction(id));
  }
};
  return (
    <MainScreen  title={`Welcome Back User ....`} >
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )}
      <MDBInputGroup   
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}>
      <MDBInput label='Search' />
    </MDBInputGroup>
    {
      Change?
      <Button onClick={() =>setChange(!Change) } className="ml-2">Sort Descending</Button>: <Button onClick={() =>setChange(!Change) } className="ml-2">Sort Ascending</Button>
    }
      {loading && <Loading />}
      {loadingDelete && <Loading />}
      
        {filteredNotes?.reverse(Change).map((note) => (
            <Accordion  key={notes._id}>
            <Accordion.Item>
              <Card style={{ margin: 10 }} key={note._id}>
                <Card.Header style={{ display: "flex" }}>
                  <span
                    style={{
                      color: "black",
                      textDecoration: "none",
                      flex: 1,
                      cursor: "pointer",
                      alignSelf: "center",
                      fontSize: 18,
                    }}
                  >
                    {" "}
                    <AccordionButton as={Button} style={{backgroundColor:"black"}} variant="dark"  onClick={handleToggle}>
                     {note.title}
                    </AccordionButton>

                   
                  </span>

                  <div>
                    <Button href={`/note/${note._id}`} style={{backgroundColor:"black"}} variant="dark" >Edit</Button>
                    <Button
                      variant="danger"
                      className="mx-2"
                      onClick={() => deleteHandler(note._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Header>
                <AccordionCollapse    className={`collapse ${!isHidden && "hidden"}`}>
                  <Card.Body>
                  {show(note.category)}
                 

                  {/* <Button href={`/show/${note.category}`}>Click</Button> */}
                                    <blockquote className="blockquote mb-0">
                      <div   >{parse(note.content)}</div>
                      <footer className="blockquote-footer">
                        Created on{" "}
                        <cite title="Source Title">
                          {note.createdAt.substring(0, 10)}
                        </cite>
                      </footer>
                    </blockquote>
                  </Card.Body>
                </AccordionCollapse>
              </Card>
              </Accordion.Item>
            </Accordion>          ))}
 
            <Link to="/createnote">
        <Button className="float-right" style={{backgroundColor:"black"}} variant="dark"    size="lg">
          Create new Note
        </Button>
        </Link>
        
    </MainScreen>
  );
};

export default MyNotes;