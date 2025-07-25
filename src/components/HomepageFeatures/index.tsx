import type { ReactNode } from "react";
import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<"svg">>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Practical Notes",
    Svg: () => <span style={{ fontSize: "3rem" }}>📒</span>,
    description: (
      <>
        Step-by-step notes and guides collected from real setups, not just
        theory. Useful when you need to get things working.
      </>
    ),
  },
  {
    title: "Easy to Navigate",
    Svg: () => <span style={{ fontSize: "3rem" }}>🔍</span>,
    description: (
      <>
        Everything's grouped and searchable — find what you need without digging
        through old project folders or chats.
      </>
    ),
  },
  {
    title: "Flexible and Expandable",
    Svg: () => <span style={{ fontSize: "3rem" }}>🧩</span>,
    description: (
      <>
        Covers what's already been solved, and leaves space to add more as you
        figure things out. One place, many use cases.
      </>
    ),
  },
  {
    title: "Clear Examples",
    Svg: () => <span style={{ fontSize: "3rem" }}>📝</span>,
    description: (
      <>
        Practical examples accompany the notes to illustrate concepts clearly
        and help you understand quickly.
      </>
    ),
  },
  {
    title: "Consistent Format",
    Svg: () => <span style={{ fontSize: "3rem" }}>📚</span>,
    description: (
      <>
        Each note follows a clear and consistent format, making it easier to
        scan and find the information you need.
      </>
    ),
  },
  {
    title: "Always a Work in Progress",
    Svg: () => <span style={{ fontSize: "3rem" }}>🚧</span>,
    description: (
      <>
        Nothing’s ever “final.” These notes grow with experience — just like the
        projects they support.
      </>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
