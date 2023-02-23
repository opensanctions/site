import { Container } from '../../components/wrapped';
import LayoutFrame from '../../components/layout/LayoutFrame';
import { SectionSpinner } from '../../components/util';

import styles from '../../styles/Research.module.scss';

export default async function Loading() {
  return (
    <LayoutFrame activeSection="research">
      <div className={styles.researchBar}>
        <Container>
          <SectionSpinner />
        </Container>
      </div>
    </LayoutFrame>
  );
}