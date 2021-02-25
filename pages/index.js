export const getServerSideProps = async () => {
  return {
    redirect: {
      permanent: true,
      destination: "/posts",
    },
  };
};

export default function Home() {
  return null;
}
