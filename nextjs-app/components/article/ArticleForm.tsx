import React from "react";
import { FormikProps } from "formik";
import * as Yup from "yup";
import AsyncCreatableSelect from "react-select/async-creatable";

import TagAPI from "../../lib/api/tag";

export interface ArticleFormValues {
  title: string;
  body: string;
  tag_list: string[];
}

export const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .min(2, "Title is too short")
    .max(250, "Title is too long"),
  body: Yup.string()
    .required("Body is required")
    .min(2, "Body is too short")
    .max(2000, "Body is too long"),
});

const ArticleForm = (
  props: FormikProps<ArticleFormValues>
): React.ReactElement => {
  const {
    errors,
    isSubmitting,
    handleSubmit,
    setFieldValue,
    getFieldProps,
    touched,
  } = props;

  return (
    <form noValidate onSubmit={handleSubmit}>
      <div className="py-2">
        <label>Title</label>
        <input
          type="text"
          className="block border border-grey-light w-full p-3 rounded mb-4"
          {...getFieldProps("title")}
        />
        {touched.title && errors.title ? (
          <div className="text-sm text-red-900">* {errors.title}</div>
        ) : null}
      </div>
      <div className="py-2">
        <label>Body</label>
        <textarea
          rows={4}
          className="block border border-grey-light w-full p-3 rounded mb-4"
          {...getFieldProps("body")}
        />
        {touched.body && errors.body ? (
          <div className="text-sm text-red-900">* {errors.body}</div>
        ) : null}
      </div>
      <div className="py-2">
        <label>Tags</label>
        <AsyncCreatableSelect
          cacheOptions
          defaultOptions
          placeholder="Tags"
          inputId="tags"
          name="tags"
          loadOptions={TagAPI.all}
          styles={{
            container: (base) => ({
              ...base,
              width: 250,
            }),
          }}
          isClearable
          isMulti
          onChange={(value) => {
            setFieldValue("tag_list", value ? value.map((x) => x.label) : "");
          }}
        />
      </div>
      <div className="py-2 text-right">
        <button
          type="submit"
          disabled={isSubmitting}
          className="p-3 rounded bg-green-600 text-white hover:bg-green-dark focus:outline-none my-1"
        >
          Create Article
        </button>
      </div>
    </form>
  );
};

export default ArticleForm;
