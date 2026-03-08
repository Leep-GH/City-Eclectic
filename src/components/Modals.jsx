import React from 'react';
import { Info, CheckCircle2 } from 'lucide-react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from './ui';
import { Button } from './ui';
import { COURSE_DATA, SCORE_THRESHOLDS } from '../constants';

/**
 * Rules modal explaining league rules
 */
export function RulesModal({ isOpen, onClose }) {
  const rules = [
    {
      num: 1,
      title: 'Unlimited Rounds',
      desc: 'You can submit hole improvements from as many official rounds as you play throughout the season. Your total rounds submitted are tracked and displayed. Submissions close at the final competition of the season.'
    },
    {
      num: 2,
      title: 'Stableford Only',
      desc: 'Only Stableford rounds can be submitted. Strokeplay rounds do not count. Enter your Stableford points for each hole exactly as recorded on your official card.'
    },
    {
      num: 3,
      title: 'Trust System',
      desc: "Entries are trust-based. Don't be that guy."
    },
    {
      num: 4,
      title: 'Hole in One Bonus',
      desc: 'A hole in one takes half the pot! If you achieve a hole in one during the season, you win 50% of the total league prize money.'
    },
    {
      num: 5,
      title: 'Tie-Breakers',
      desc: 'In the event of a tie for Total Eclectic Points at the end of the season, standard countback rules will apply.'
    },
    {
      num: 6,
      title: 'Corrections',
      desc: "Confirmed rounds are locked. If you accidentally log a wrong score, just shout in the WhatsApp group and an admin will fix it."
    },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader title="League Rules" icon={Info} onClose={onClose} />
      <ModalBody className="space-y-5 text-sm text-gray-600">
        <ul className="space-y-5">
          {rules.map((rule) => (
            <li key={rule.num} className="flex gap-4">
              <span className="font-bold text-emerald-600 text-lg">{rule.num}</span>
              <span className="pt-0.5">
                <strong>{rule.title}:</strong> {rule.desc}
              </span>
            </li>
          ))}
        </ul>
      </ModalBody>
      <ModalFooter>
        <Button variant="dark" size="full" onClick={onClose}>
          Understood
        </Button>
      </ModalFooter>
    </Modal>
  );
}

/**
 * Confirmation modal for submitting burns
 */
export function ConfirmModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  stagedBurns, 
  roundsLogged 
}) {
  const burnEntries = Object.entries(stagedBurns);
  const hasBurns = burnEntries.length > 0;

  return (
    <Modal isOpen={isOpen} onClose={onClose} zIndex={80}>
      <div className="p-6 border-b border-gray-100 bg-emerald-50 text-center">
        <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-3 text-emerald-600">
          <CheckCircle2 className="w-7 h-7" />
        </div>
        <h3 className="text-xl font-bold text-emerald-900">
          Confirm Submission
        </h3>
        <p className="text-sm text-emerald-700 mt-2">
          This will be round <strong>{roundsLogged + 1}</strong> logged this season.
        </p>
      </div>
      
      <div className="p-5 max-h-[40vh] overflow-y-auto space-y-3 bg-gray-50">
        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
          Holes Improved
        </h4>
        
        {!hasBurns ? (
          <div className="bg-white p-4 rounded-xl border border-gray-200 text-center text-gray-500 text-sm">
            No improvements recorded for this round.
          </div>
        ) : (
          burnEntries.map(([holeStr, data]) => {
            const holeNum = parseInt(holeStr);
            const holeData = COURSE_DATA.find(h => h.hole === holeNum);
            const isExceptional = data.newScore >= SCORE_THRESHOLDS.EAGLE_OR_BETTER;
            
            return (
              <div 
                key={holeStr} 
                className="flex justify-between items-center bg-white p-3 rounded-lg border border-gray-200"
              >
                <span className="font-semibold text-gray-800">
                  Hole {holeStr} 
                  <span className="text-gray-400 text-xs ml-1">
                    ({holeData?.name})
                  </span>
                </span>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-400 line-through">{data.oldScore} pts</span>
                  <span className="text-gray-300">→</span>
                  <span className={`font-bold ${isExceptional ? 'text-amber-500' : 'text-emerald-600'}`}>
                    {data.newScore} pts
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="p-5 border-t border-gray-100 flex gap-3 bg-white">
        <Button variant="secondary" className="flex-1" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" className="flex-[2]" onClick={onConfirm}>
          Confirm & Submit
        </Button>
      </div>
    </Modal>
  );
}
