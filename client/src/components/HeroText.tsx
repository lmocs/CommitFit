import { Container, Text, Title } from '@mantine/core';
import classes from '../HeroText.module.css';

export function HeroText() {
  return (
    <Container className={classes.wrapper} size={1400}>
      <div className={classes.inner}>
        <Title className={classes.title}>
          Get in shape together with {' '}
          <Text component="span" className={classes.highlight} inherit>
            CommitFit
          </Text>{' '}
        </Title>

        <Container p={0} size={600}>
          <Text size="lg" c="dimmed" className={classes.description}>
            It's time to start your fitness journey {' '}
            <Text component="span" className={classes.highlight} inherit>
              together
            </Text>
            . Make a pact with a friend and start betting on yourself today.
          </Text>
        </Container>
      </div>
    </Container>
  );
}
