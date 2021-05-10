import React, { FC } from "react";
import { withFormik } from "formik";
import { Modal } from "antd";

import { nextAxios } from "../../lib/utils/axios-instance";

export interface FormWithModalProps {
  onHide: (refresh?: boolean) => void;
}

import ArticleForm, {
  ArticleFormValues,
  validationSchema,
} from "./ArticleForm";

const NewArticleModal: FC<FormWithModalProps> = ({ onHide }) => {
  const EnhancedArticleForm = withFormik<object, ArticleFormValues>({
    mapPropsToValues: () => ({ title: "", body: "", tag_list: "" }),

    validationSchema: validationSchema,

    handleSubmit: async (values: ArticleFormValues, { props, ...actions }) => {
      try {
        await nextAxios.post("/api/articles/create", values);
        onHide(true);
      } catch (error) {
        actions.setErrors(error.response.data);
      }
    },
  })(ArticleForm);

  const handleClose = () => {
    onHide(false);
  };

  return (
    <Modal
      title="New Article"
      visible={true}
      onOk={handleClose}
      onCancel={handleClose}
      footer={null}
    >
      <EnhancedArticleForm />
    </Modal>
  );
};

export default NewArticleModal;
