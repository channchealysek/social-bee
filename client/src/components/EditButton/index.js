import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Modal, Grid, Form } from "semantic-ui-react";
import EditForm from "../EditForm";

export default function EditButton({ postId }) {
  const [open, setOpen] = useState(false);
  return (
    <Modal
      as={Form}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <Button color="blue" floated="right" as={Link} to={`/posts/edit/${postId}`}>
          <Icon name="edit" style={{ margin: 0 }} />
        </Button>
      }
    >
      <Modal.Content>
        <Modal.Description>
          <Grid.Column width={12} style={{ margin: 10 }}>
            <EditForm postId={postId} />
          </Grid.Column>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
}
