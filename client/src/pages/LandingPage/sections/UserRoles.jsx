import SectionHeading from '../ui/SectionHeading';
import './UserRoles.css';

const ROLES = [
  {
    icon: '🛡️',
    role: 'Admin',
    color: 'admin',
    desc: 'Full platform control. Manages users, permissions, QR features, document templates, and all system settings.',
    permissions: [
      'Manage all users & roles',
      'Configure QR features & templates',
      'Access all analytics',
      'System-wide settings',
      'Create, edit & delete all content',
    ],
  },
  {
    icon: '✏️',
    role: 'Editor',
    color: 'editor',
    desc: 'The primary creator role. Generates QR codes, builds event documents, and links them together for distribution.',
    permissions: [
      'Generate & customize QR codes',
      'Create Whatshapping & ECR documents',
      'Export PDF & DOC files',
      'Link documents to QR codes',
      'View own analytics',
    ],
  },
  {
    icon: '👁️',
    role: 'Viewer',
    color: 'viewer',
    desc: 'Read-only access for stakeholders. Scan QR codes to access linked documents without being able to modify anything.',
    permissions: [
      'Scan QR codes',
      'View linked documents',
      'Download shared PDFs',
      'No editing access',
      'No analytics access',
    ],
  },
];

export default function UserRoles() {
  return (
    <section className="user-roles" id="roles">
      <div className="container">
        <SectionHeading
          eyebrow="Access Control"
          title="Role-Based Access for Every User"
          subtitle="Secure, enforced access control ensures each user sees and does only what they are authorized for — protecting documents and QR data at all times."
        />
        <div className="user-roles__grid">
          {ROLES.map(r => (
            <div key={r.role} className={`role-card role-card--${r.color}`}>
              <div className="role-card__header">
                <span className="role-card__icon">{r.icon}</span>
                <span className="role-card__badge">{r.role}</span>
              </div>
              <p className="role-card__desc">{r.desc}</p>
              <ul className="role-card__perms">
                {r.permissions.map(p => (
                  <li key={p} className="role-card__perm">
                    <span className="role-card__check">✓</span> {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
