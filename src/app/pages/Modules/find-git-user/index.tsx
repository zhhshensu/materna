import { useState, useRef } from 'react'
import { useFormik } from 'formik'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast'
import { classNames } from 'primereact/utils'
import { GitUserService } from '../../../service/GitUserService'

const FindGitUser = () => {
  const toast = useRef<any>(null)

  const show = () => {
    toast?.current.show({
      severity: 'success',
      summary: 'Form Submitted',
      detail: formik.values.value,
    })
  }

  const formik = useFormik({
    initialValues: {
      value: '',
    },
    validate: (data) => {
      const errors = {}

      if (!data.value) {
        errors.value = '请输入github用户名'
      }

      return errors
    },
    onSubmit: (data) => {
      data && show(data)
      formik.resetForm()
    },
  })

  const isFormFieldInvalid = (name: string) => {
    return !!(formik.touched[name] && formik.errors[name])
  }

  const getFormErrorMessage = (name) => {
    return isFormFieldInvalid(name) ? (
      <small className="p-error">{formik.errors[name]}</small>
    ) : (
      <small className="p-error">&nbsp;</small>
    )
  }

  return (
    <div className="card flex justify-content-center">
      <form onSubmit={formik.handleSubmit} className="flex flex-column">
        <span className="p-float-label">
          <Toast ref={toast} />
          <InputText
            id="value"
            name="value"
            value={formik.values.value}
            onChange={(e) => {
              formik.setFieldValue('value', e.target.value)
            }}
            className={classNames({
              'p-invalid': isFormFieldInvalid('value'),
            })}
          />
          <label htmlFor="input_value">github名称</label>
        </span>
        {getFormErrorMessage('value')}
        <Button type="submit" label="搜索" />
      </form>
    </div>
  )
}

export default FindGitUser
