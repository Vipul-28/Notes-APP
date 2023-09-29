import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createNoteAction } from "../../actions/notesActions";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";
import MainScreen from "../../component/MainScreen";
import Loading from "../../component/Loading";
import ErrorMessage from "../../component/ErrorMessage";
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg'
import JoditEditor from 'jodit-react';
import { serializeToRaw } from "draft-js";

const CreateNote=()=> {
  const editor = useRef(null);
  const[content,setContent]=useState('');

  const history=useNavigate();
;

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");

  const dispatch = useDispatch();

  const noteCreate = useSelector((state) => state.noteCreate);
  const { loading, error, note } = noteCreate;
  const userLogin = useSelector((state) => state.userLogin);

  const{userInfo}=userLogin

  console.log(note);

 


  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createNoteAction(title, content, category));
    if (!title || !content || !category) return;

    resetHandler();
    history("/mynotes");
  };
const navigate=useNavigate();
  useEffect(()=>{
    if(!userInfo)
    navigate("/login");
  },[navigate,userInfo]);

  return (
    <MainScreen title="Create a Note">
      <Card>
        <Card.Header>Create a new Note</Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                value={title}
                placeholder="Enter the title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            

            <Form.Group controlId="content">
              <Form.Label>Content</Form.Label>
              <JoditEditor
			ref={editor}
			value={content}
			onChange={newContent =>setContent(newContent) }
		/>
            </Form.Group>
            {content && (
              <Card>
                <Card.Header>Note Preview</Card.Header>
                <Card.Body>
                  <ReactMarkdown>{content}</ReactMarkdown>
                </Card.Body>
              </Card>
            )}

            <Form.Group controlId="content">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="content"
                value={category}
                placeholder="Enter the Category"
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>
            {loading && <Loading size={50} />}
            <Button type="submit" style={{backgroundColor:"black"}} variant="dark" >
              Create Note
            </Button>
            <Button className="mx-2" onClick={resetHandler} variant="danger">
              Reset Feilds
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Creating on - {new Date().toLocaleDateString()}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
}

export default CreateNote;
