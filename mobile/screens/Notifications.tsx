// screens/Notifications.tsx
import React from "react";
import ScreenLayout from "../layouts/ScreenLayout";
import AppMode from "../components/AppMode";
import NotificationsContainer from "../containers/NotificationsContainer";

const Notifications = () => {
  return (
    <ScreenLayout
      title="Notifications"
      rightComponent={<AppMode />}
      scroll={false}
    >
      <NotificationsContainer />
    </ScreenLayout>
  );
};

export default Notifications;
