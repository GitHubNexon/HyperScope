// containers/About.tsx

import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import ScreenLayout from "../layouts/ScreenLayout";
import AppText from "../components/AppText";
import AppMode from "../components/AppMode";
import CardContainer from "../components/CardContainer";

const About = () => {
  return (
    <ScreenLayout title="About" rightComponent={<AppMode />}>
      <ScrollView contentContainerStyle={styles.container}>
        <CardContainer
          title="About the App"
          icon="information-circle-outline"
          description="This News App provides the latest global headlines with a simple, clean interface. Stay informed with real-time updates and personalized topics."
          date={new Date()}
          link="https://hypercoresolution.com/"
        />
        <CardContainer
          title="Frequently Asked Questions"
          icon="help-circle-outline"
          description="How do I customize my news feed? Go to settings and choose your preferred categories and sources."
        />
        <CardContainer
          title="Contact & Support"
          icon="mail-outline"
          description="For questions, feedback, or issues, email us or visit our support page."
          link="mailto:support@newsapi.org"
        />
        <CardContainer
          title="Terms & Privacy"
          icon="document-text-outline"
          description="Read our privacy policy and terms of service to understand how we handle your data."
          link="https://newsapi.org/privacy"
        />
      </ScrollView>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});

export default About;
