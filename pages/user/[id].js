import { useEffect, useState } from "react";
import { Layout, Input, Label } from "../../components";
import { isTokenValid, getUser } from "../../lib";

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
      <h2>User Details</h2>
      <Label htmlFor="username">Username</Label>
      <Input
        id="username"
        name="username"
        value={formData.username}
        onChange={handleChange}
      />

      <Label htmlFor="name">Name</Label>
      <Input
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />

      <Label htmlFor="email">Email</Label>
      <Input
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />

      <Label htmlFor="phone">Phone</Label>
      <Input
        id="phone"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
      />

      <Label htmlFor="website">Website</Label>
      <Input
        id="website"
        name="website"
        value={formData.website}
        onChange={handleChange}
      />

      <button
        onClick={() => {
          setFormData((prevState) => ({ ...prevState, ...user }));
          setIsEditing(false);
        }}
      >
        Cancel
      </button>
      <button
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
      </button>
    </>
  );

  const viewUserDetails = (
    <>
      <h2>User Details</h2>
      <h3>Username</h3>
      <div>{user.username}</div>

      <h3>Name</h3>
      <div>{user.name}</div>

      <h3>Email</h3>
      <div>{user.email}</div>

      <h3>Phone</h3>
      <div>{user.phone}</div>

      <h3>Website</h3>
      <div>{user.website}</div>

      <button onClick={() => setIsEditing(true)}>Edit</button>
    </>
  );

  return <Layout>{isEditing ? editUserDetails : viewUserDetails}</Layout>;
};

export default EditUser;
