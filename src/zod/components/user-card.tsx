import type { GetUsersResponseEntry, GetUserResponse, Address } from '../user';

type Props = {
  // user: User;
  user: GetUsersResponseEntry | GetUserResponse;
};

function Address({ address }: { address: Address }) {
  return (
    <div>
      <p>
        <b>city:</b> {address.city}
      </p>
      <p>
        <b>postalCode:</b> {address.postalCode}
      </p>
      <p>
        <b>street:</b> {address.street}
      </p>
    </div>
  );
}

export function UserCard({ user }: Props) {
  return (
    <div>
      <p>
        <b>id:</b> {user.id}
      </p>
      <p>
        <b>email:</b> {user.email}
      </p>
      {user.firstName ? (
        <p>
          <b>firstName:</b> {user.firstName}
        </p>
      ) : null}
      {user.lastName ? (
        <p>
          <b>lastName:</b> {user.lastName}
        </p>
      ) : null}
      <p>
        <b>lastName:</b> {user.birthday.toDateString()}
      </p>
      {'address' in user ? <Address address={user.address} /> : null}
      <hr />
    </div>
  );
}
