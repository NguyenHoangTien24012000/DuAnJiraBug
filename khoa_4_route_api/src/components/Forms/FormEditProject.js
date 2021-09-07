import { Editor } from '@tinymce/tinymce-react'
import { withFormik } from 'formik';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, connect, useSelector } from 'react-redux'
import * as Yup from 'yup'
import { get_project_action, update_project_action } from '../../redux/actions/CyberBugsAction';

function FormEditProject(props) {
    const arrProjectCategory = useSelector(state => state.ProjectCategoryCyberBugs.arrProjectCategory)

    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        setInitialValue,
        setFieldValue
    } = props;


    const dispatch = useDispatch()

    useEffect(() => {

        dispatch({
            type: 'SET_SUBMIT_PROJECT',
            submitFunction: handleSubmit
        })
        dispatch(get_project_action())
    }, [])

    const handleEditorChange = ((content, editor) => {
        setFieldValue('description', content)
    })
    return (

        <form className="container" onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-4">
                    <div className="form-group">
                        <p className="font-weight-bold">Project id</p>
                        <input value={values.id} disabled className="form-control" name="id" />
                    </div>
                </div>
                <div className="col-4">
                    <div className="form-group">
                        <p className="font-weight-bold">Project Name</p>
                        <input value={values.projectName} className="form-control" name="projectName" onChange={handleChange} />
                    </div>
                    <p className="text-danger">{errors.projectName}</p>
                </div>
                <div className="col-4">
                    <div className="form-group">
                        <p className="font-weight-bold">Project Category</p>
                        <select name="categoryId" className="form-control" value={values.categoryId} onChange={handleChange}>
                            {arrProjectCategory.map((item, index) => {
                                return <option value={item.id} key={index}>{item.projectCategoryName}</option>
                            })}
                        </select>
                    </div>
                </div>
                <div className="col-12">
                    <div className="form-group">
                        <p className="font-weight-bold">Description</p>
                        <Editor
                            name="description123"

                            initialValue={values.description}
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
                        <p className="text-danger">{errors.description}</p>
                    </div>
                </div>
            </div>
        </form>
    )
}



const EditProjectForm = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        // console.log(props)
        const { projectEdit } = props

        return {
            id: projectEdit?.id,
            projectName: projectEdit?.projectName,
            categoryId: projectEdit?.categoryId,
            description: projectEdit?.description
        }
    },

    // Custom sync validation
    validationSchema: Yup.object().shape({
        projectName: Yup.string().required('ProjectName is required!!'),
        description: Yup.string().required('Description is required!!')
    }),

    handleSubmit: (values, { props, setSubmitting }) => {
        props.dispatch(update_project_action(values))

    },

    displayName: 'EditProjectForm',
})(FormEditProject);

const mapStateToProps = (state) => ({
    projectEdit: state.ProjectEditReducer.projectEdit
})

export default connect(mapStateToProps)(EditProjectForm)
