import { Field } from "formik";
import { useEffect, useState } from "react";
import { AppForm, FieldError } from "../components/app-form";
import BaseLayout from "../layouts/base";
import { profileSchema } from "../utils/validations";

export default function ProfileScreen() {
  const [userFields, setUserFields] = useState({});
  const user = JSON.parse(window.localStorage.getItem("user"));

  useEffect(() => {
    const fields = {};
    for (let field in user) {
      if (!user[field]) {
        fields[field] = "";
      } else {
        fields[field] = user[field];
      }
    }

    setUserFields(fields);
  }, []);

  console.log("user: ", user);

  const handleSubmit = ({ formValues }) => {
    console.log("profile subbmited values: ", formValues);
  };

  return (
    <BaseLayout hasSearch={false}>
      <h3 className="text-center">Your Public Profile</h3>
      <hr />
      <div className="my-4">
        <AppForm
          initialValues={user}
          validationSchema={profileSchema}
          handleSubmit={handleSubmit}
        >
          {/* <div className="form-group">
            <label htmlFor="profile_image">Profile Picture</label>
            <Field type="file" className="form-control" id="profile_image" />
          </div> */}
          <div className="form-group mt-3">
            <label htmlFor="name">Name</label>
            <Field type="text" className="form-control" id="name" name="name" />
            <FieldError field="name" />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="dof">Date of Birth</label>
            <Field
              type="date"
              className="form-control"
              id="dof"
              name="dateOfBirth"
            />
            <FieldError field="dateOfBirth" />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="email">Email</label>
            <Field
              type="email"
              className="form-control"
              id="email"
              name="email"
              disabled
            />
            <FieldError field="email" />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="city">City</label>
            <Field type="text" className="form-control" id="city" name="city" />
            <FieldError field="city" />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="phone">Phone</label>
            <Field
              type="text"
              className="form-control"
              id="phone"
              name="phone"
            />
            <FieldError field="phone" />
          </div>
          <div class="form-group mt-3">
            <label for="about">About</label>
            <Field
              component="textarea"
              className="form-control"
              rows="2"
              id="about"
              name="about"
            />
            <FieldError field="about" />

            {/* <textarea
              class="form-control"
              rows="2"
              id="about"
              name="about"
            ></textarea> */}
          </div>
          <div class="form-group mt-3">
            <label for="address">Address*</label>
            <Field
              component="textarea"
              className="form-control"
              rows="2"
              id="address"
              name="address"
            />
            <FieldError field="address" />
          </div>
          <div class="form-group mt-3">
            <label for="country">Select Country</label>
            <Field
              class="form-control"
              id="country"
              name="country"
              component="select"
            >
              <option value="ind">India</option>
              <option value="usa">USA</option>
              <option value="can">Canada</option>
            </Field>
            <FieldError field="country" />
          </div>

          <button type="submit" className="btn btn-success mt-3">
            Save Changes
          </button>
        </AppForm>
      </div>
    </BaseLayout>
  );
}
