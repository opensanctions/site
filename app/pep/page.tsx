import Link from 'next/link'
import styles from '../../styles/Home.module.scss'
import { Col, Row, Container, Form, FormControl, Badge, Button, ButtonGroup, InputGroup } from '../../components/wrapped';
import LayoutFrame from '../../components/layout/LayoutFrame';


export default async function Page() {
    return (
        <LayoutFrame>
            <div className={styles.claimBanner}>
                <Container>
                    <Row>

                        <h1 className={styles.claim}>
                            Screen against well-understood PEP data
                        </h1>
                        <p className={styles.subClaim}>
                            Preventative screening where you can have insight into the data you're working with.
                        </p>

                    </Row>
                </Container>
            </div>
            <Container>
                <Row>
                    <Col md={4} className={styles.explainer}>
                        <h2>Data source transparency</h2>
                        The OpenSanctions PEPs dataset packages publicly available PEP data in a consistent structured format. <a href="#sources">Read more about our data PEP sources</a> and how they are maintained.
                    </Col>
                    <Col md={4} className={styles.explainer}>
                        <h2>Inclusion methodology</h2>
                        We currently take the conservative approach of maintaining PEPs 5 years after they leave any relevant posts. We are working towards expanding that within <a href="https://www.fatf-gafi.org/en/publications/Fatfrecommendations/Peps-r12-r22.html">FATF-GATF guidelines</a>
                    </Col>
                    <Col md={4} className={styles.explainer}>
                        <h2>Data quality transparency</h2>
                        We are continually improving the transparent evaluation of our data quality, sharing the methodology openly and building on feedback from data users.
                    </Col>
                </Row>
                <Row>
                    <section>
                        <h2>Who are Politically Exposed Persons? Who needs this?</h2>
                        <p>PEPs are people in positions of power. Being classified as a PEP doesn't imply you've done anything wrong. ... Lorem ipsum dolor blah...</p>
                        <p>The reason someone is included in the dataset is indicated in the data.
                            Known PEPs are annotated with the <code>role.pep</code> <a href="https://www.opensanctions.org/reference/#type.topic">topic</a>,
                            while their known close associates would be annotated with the <code>role.rca</code> topic.
                            Persons who do not meet the general requirements for being considered PEPs but are maintained
                            on lists for closer scrutiny by investigative organisations are annotated with the <code>poi</code> topic.
                            In contrast, officially sanctioned entities will be annotated with the <code>sanctioned</code> topic.</p>
                    </section>
                </Row>
                <Row>
                    <div dangerouslySetInnerHTML={{
                        __html: `
                    <section>
                        <h3>
                            <a id="sources">
                            </a>Data sources<span class="badge bg-dark">
                                <span>7</span>
                            </span>
                        </h3>
                        <p><a href="/datasets/peps/">Politically Exposed Persons (PEPs)s</a> a collection dataset which bundles together entities from the following data sources:</p>
                        <table class="table table-sm">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Last changed</th>
                                    <th>Country</th>
                                    <th class="numeric">Targets</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <a href="/datasets/wd_peps/">Wikidata Politically Exposed Persons</a><br/>
                                        <span class="badge bg-light">non-official source</span>
                                    </td>
                                    <td>2023-06-08</td>
                                    <td>
                                        <span class="badge bg-light">
                                        </span>
                                    </td>
                                    <td class="numeric">
                                        <span>130,204</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <a href="/datasets/everypolitician/">Every Politician</a>
                                    </td>
                                    <td>2022-04-23</td>
                                    <td>
                                        <span class="badge bg-light">
                                        </span>
                                    </td>
                                    <td class="numeric">
                                        <span>73,172</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <a href="/datasets/ru_rupep/">RuPEP Public Database of PEPs in Russia and Belarus</a>
                                    </td>
                                    <td>2023-05-11</td>
                                    <td>
                                        <span class="badge bg-light">Russia</span>
                                    </td>
                                    <td class="numeric">
                                        <span>10,096</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <a href="/datasets/us_cia_world_leaders/">CIA World Leaders</a>
                                    </td>
                                    <td>2023-06-01</td>
                                    <td>
                                        <span class="badge bg-light">United States</span>
                                    </td>
                                    <td class="numeric">
                                        <span>5,415</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <a href="/datasets/eu_meps/">Members of the European Parliament</a>
                                    </td>
                                    <td>2023-06-02</td>
                                    <td>
                                        <span class="badge bg-light">European Union</span>
                                    </td>
                                    <td class="numeric">
                                        <span>705</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <a href="/datasets/eu_cor_members/">Members of the European Commitee of the Regions</a>
                                    </td>
                                    <td>2023-03-13</td>
                                    <td>
                                        <span class="badge bg-light">European Union</span>
                                    </td>
                                    <td class="numeric">
                                        <span>624</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <a href="/datasets/md_rise_profiles/">RISE Moldova People of interest</a>
                                    </td>
                                    <td>2023-06-07</td>
                                    <td>
                                        <span class="badge bg-light">Moldova</span>
                                    </td>
                                    <td class="numeric">
                                        <span>394</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </section>`}} />
                    <section>
                        <p>The <a href="https://www.opensanctions.org/datasets/wd_peps/">Wikidata Politically Exposed Persons</a> 
                         dataset is maintained by volunteers in a similar manner to the rest of the Wikimedia Foundation projects. 
                         OpenSanctions monitors specific positions in national and sub-national legislatures, executives and senior
                         administrators for changes. Note however that this data is only as up to date as the community-contributed
                         updates. In future, OpenSanctions hopes to support more active maintenance of the data in Wikidata, and by extension
                         this dataset.
                        <a href="https://www.opensanctions.org/datasets/wd_peps/">Read more...</a></p>
                        <p>The <a href="https://www.opensanctions.org/datasets/everypolitician/">EveryPolitician project</a> 
                        by mySociety was shut down in June 2019. While it contains a significant foundation of data for national 
                        and sub-national legislatures in 233 countries and territories, it is becoming less representative over 
                        time and will be removed or replaced in time. <a href="https://www.opensanctions.org/datasets/everypolitician/">Read more...</a></p>
                        <p>The RUPEP dataset is ...</p>
                    </section>
                </Row>
            </Container>
        </LayoutFrame>
    )
}