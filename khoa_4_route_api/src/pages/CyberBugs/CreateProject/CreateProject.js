import React, { useEffect } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import {useSelector,connect, useDispatch} from 'react-redux' ;
import {withFormik} from "formik"

import * as Yup from 'yup';
import { create_project_action } from '../../../redux/actions/ProjectAction';
import { get_project_category_action } from '../../../redux/actions/ProjectCategoryAction';
function CreateProject(props) {
    const arrProjectCategory = useSelector(state=>state.ProjectCategoryCyberBugs.arrProjectCategory)
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(get_project_category_action())
    },[]);
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue
      } = props;
    
    const handleEditorChange = (content, editor) =>{
         setFieldValue('description',content)
    }
    return (
        <form className='container m-5' onSubmit={handleSubmit}>
            <h3>Create Project</h3>
            <div className="form-group">
                <p>Name</p>
                <input className="form-control" name="projectName"  onChange={handleChange} />
                <div className="text-danger">{errors.projectName}</div>
            </div>
            <div className="form-group" >
                <p>Description</p>
               
                <Editor
                    name = "description"
                   
                    initialValue=""
                    init={{
                        height: 500,
                        menubar: false,
                        plugins: [
                            'advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help wordcount'
                        ],
                        toolbar: 'undo redo | formatselect | ' +
                            'bold italic backcolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | help',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        
                    }}
                    onEditorChange={handleEditorChange}
                />
                <div className="text-danger">{errors.description}</div>
                {/* <button onClick={log}>Log editor content</button> */}
            </div>
            <div className="form-group">
                <p>Category</p>
                <select  name="categoryId" className="form-control" onChange={handleChange}>
                    {arrProjectCategory.map((item, index) =>{
                        return <option value={item.id} key={index}>{item.projectCategoryName}</option>
                    })}
                </select>
            </div>
            <button type="submit" className="btn btn-outline-primary">Create Project</button>
        </form>
    )
}

const CreateProjectWithFormik = withFormik({
    enableReinitialize : true,
    mapPropsToValues: (props) => { 
      return {
        projectName : '',
        description : '',
        categoryId :props.arrProjectCategory[0]?.id
      }
    }, 

  
   
    validationSchema: Yup.object().shape({
        projectName:Yup.string().required('ProjectName is required!!'),
        description:Yup.string().required('Description is required!!')
    }),
    handleSubmit: (values, {props, setSubmitting }) => {
        // console.log(values)
       props.dispatch(create_project_action(values))
    },
  
    displayName: 'Create Project CyberBugs',
  })(CreateProject);

const mapStateToProps = (state) =>{
    return {
        arrProjectCategory: state.ProjectCategoryCyberBugs.arrProjectCategory
    }
}

export default connect (mapStateToProps)(CreateProjectWithFormik)