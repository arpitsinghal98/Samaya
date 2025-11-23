import { Heading } from './Heading';
import { Subheading } from './Subheading';
import { CTAButton } from './CTAButton';

export function LeftSection() {
    return (
        <div className="flex flex-col justify-center">
            <Heading />
            <Subheading />
            <CTAButton />
        </div>
    );
}