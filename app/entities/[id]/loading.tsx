import Research from '../../../components/Research';
import { Container } from '../../../components/wrapped';
import { SectionSpinner, } from '../../../components/util';

import LayoutFrame from '../../../components/layout/LayoutFrame';


export default async function LoadingPage() {
  return (
    <LayoutFrame activeSection="research">
      <Research.Context>
        <Container>
          <SectionSpinner />
        </Container>
      </Research.Context>
    </LayoutFrame>
  )
}
