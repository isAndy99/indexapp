import { useEffect, useState } from "react";
import Head from "next/head";
import { Layout, Input, Label, Button } from "../../components";
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
      <div>
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label htmlFor="website">Website</Label>
        <Input
          id="website"
          name="website"
          value={formData.website}
          onChange={handleChange}
        />
      </div>
    </>
  );

  const viewUserDetails = (
    <>
      <div>
        <h3>Username</h3>
        <div>{user.username}</div>
      </div>

      <div>
        <h3>Name</h3>
        <div>{user.name}</div>
      </div>

      <div>
        <h3>Email</h3>
        <div>{user.email}</div>
      </div>

      <div>
        <h3>Phone</h3>
        <div>{user.phone}</div>
      </div>

      <div>
        <h3>Website</h3>
        <div>{user.website}</div>
      </div>
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
