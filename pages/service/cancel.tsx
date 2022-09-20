import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';

export default function Account({ test }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (<h1>"I'm a banana!"</h1>);
}


export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  return {
    props: {
      test: true
    },
  }
}