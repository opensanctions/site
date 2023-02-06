import Research from '../../../components/Research';
import { Container } from '../../../components/wrapped';
import { SectionSpinner, } from '../../../components/util';

import LayoutFrame from '../../../components/layout/LayoutFrame';


export default async function LoadingPage() {
  return (
    <p>Under maintenance</p>
    // <LayoutFrame activeSection="research">
    //   <Research.Context isLoading>
    //     <Container>
    //       <SectionSpinner />
    //     </Container>
    //   </Research.Context>
    // </LayoutFrame>
  )
}
