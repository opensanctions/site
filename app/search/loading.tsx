import Research from '../../components/Research';
import { Container } from '../../components/wrapped';
import { SectionSpinner, } from '../../components/util';

import LayoutFrame from '../../components/layout/LayoutFrame';
import { PageProps } from '../../components/utils/PageProps';


export default async function LoadingPage({ searchParams }: PageProps) {
  return (
    <LayoutFrame activeSection="research">
      <Research.Context query={searchParams} isLoading>
        <Container>
          <SectionSpinner />
        </Container>
      </Research.Context>
    </LayoutFrame>
  )
}
