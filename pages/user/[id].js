import { useEffect, useState } from "react";
import Head from "next/head";

import { Layout, Button, InputField, DataField } from "../../components";
import { isTokenValid, getUser } from "../../lib";

import styles from "../../styles/User.module.scss";

export const getServerSideProps = async ({ req, params }) => {
  if (!isTokenValid(req)) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }

  const userData = await getUser(params.id);

  return {
    props: {
      userData,
    },
  };
};

const EditUser = ({ userData }) => {
  const { address, company, ...details } = userData;

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(details);
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(userData);
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.currentTarget;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const editUserDetails = (
    <>
      <InputField
        label="Username"
        id="username"
        name="username"
        value={formData.username}
        onChange={handleChange}
      />

      <InputField
        label="Name"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />

      <InputField
        label="Email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />

      <InputField
        label="Phone"
        id="phone"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
      />

      <InputField
        label="website"
        id="website"
        name="website"
        value={formData.website}
        onChange={handleChange}
      />
    </>
  );

  const viewUserDetails = (
    <>
      <DataField label="Username">{user.username}</DataField>
      <DataField label="Name">{user.name}</DataField>
      <DataField label="Email">{user.email}</DataField>
      <DataField label="Phone">{user.phone}</DataField>
      <DataField label="Website">{user.website}</DataField>
    </>
  );

  return (
    <Layout>
      <Head>
        <title>{user.name}</title>
      </Head>
      <div className={styles.container}>
        <h1>User Details</h1>
        <div style={{ flex: 1 }}>
          <div className={styles.content}>
            {isEditing ? editUserDetails : viewUserDetails}
          </div>
        </div>
        <div className={styles.buttons}>
          {isEditing ? (
            <>
              <Button
                className={styles.cancelButton}
                onClick={() => {
                  setFormData((prevState) => ({ ...prevState, ...user }));
                  setIsEditing(false);
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  // fake a save
                  setUser((prevState) => ({
                    ...prevState,
                    ...formData,
                  }));
                  setIsEditing(false);
                }}
              >
                Save
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>Edit</Button>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default EditUser;
