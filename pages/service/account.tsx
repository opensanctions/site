import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';

export default function Account({ test }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <p>{'I am a banana!'}</p>
  )
}


export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  return {
    props: {
      test: true
    },
  }
}