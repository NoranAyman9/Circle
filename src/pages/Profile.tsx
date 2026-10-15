import { useEffect, useState } from "react";
import { Alert, Avatar, Button, Card, CardBody, Input } from "@heroui/react";

export default function Profile() {
  const [user, setUser] = useState({
    name: "Noran",
    email: "Noran@gmail.com",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState(user);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    if (!successMsg) return;

    const timer = setTimeout(() => {
      setSuccessMsg("");
    }, 2000);

    return () => clearTimeout(timer);
  }, [successMsg]);

  function startEdit() {
    setForm(user);
    setSuccessMsg("");
    setIsEditing(true);
  }

  function cancelEdit() {
    setIsEditing(false);
  }

  function saveEdit() {
    setUser(form);
    setIsEditing(false);
    setSuccessMsg("Profile updated successfully");
  }

  return (
    <div className="mx-auto max-w-md p-4">
      <Card>
        <CardBody className="grid justify-items-center gap-3 py-8 text-center">
          <Avatar
            name={isEditing ? form.name : user.name}
            className="h-24 w-24 text-large"
          />

          {isEditing ? (
            <div className="grid w-full gap-3">
              <Input
                label="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <Input
                label="Email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <div className="flex justify-center gap-2">
                <Button
                  color="primary"
                  size="sm"
                  onPress={saveEdit}
                  isDisabled={!form.name.trim() || !form.email.trim()}
                >
                  Save
                </Button>
                <Button
                  color="danger"
                  variant="light"
                  size="sm"
                  onPress={cancelEdit}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-default-500">{user.email}</p>
              <Button
                color="primary"
                variant="bordered"
                size="sm"
                onPress={startEdit}
              >
                Edit Profile
              </Button>
            </>
          )}

          {successMsg && (
            <Alert
              hideIcon
              color="success"
              title={successMsg}
              variant="faded"
              classNames={{ base: "py-0 text-center" }}
            />
          )}
        </CardBody>
      </Card>
    </div>
  );
}